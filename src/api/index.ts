import { isNil, get } from 'lodash';
import { exerciseType } from '../redux/features/exercises';

let db: IDBDatabase | null = null;

export const openDB = async(): Promise<void> => {
    const openRequest = indexedDB.open("roadSoFar", 1);

    let promise = new Promise<void>((resolve, reject) => {
        openRequest.onupgradeneeded = function(event) {

            const thisDb = get(event, 'target.result', null);
            
            if (!thisDb.objectStoreNames.contains('exercises')) { 
                thisDb.createObjectStore('exercises', { keyPath: 'id' });
            }            
        };

        openRequest.onerror = () => { reject('error in indexedDB connection'); };
        openRequest.onsuccess = () => {
            db = openRequest.result;            
            resolve();
        };
    })

    return await promise;
}

export const getExercises = async (): Promise<exerciseType[]> => {
    
    if (isNil(db)) { await openDB(); }

    let promise = new Promise<exerciseType[]>((resolve, reject) => {
        if (isNil(db)) { 
            reject('no db instance')
        } else {
            let transaction = db.transaction("exercises", "readonly");
            let exercises = transaction.objectStore("exercises")

            let request = exercises.getAll();

            request.onsuccess = () => { resolve(request.result as exerciseType[]);}
            request.onerror = () => { reject('error by getting all exercises')}
        }
    })

    return await promise;
}

export const saveExerciseItem = async (item: exerciseType): Promise<exerciseType> => {
    let promise = new Promise<exerciseType>((resolve, reject) => {

        if (isNil(db)){
            reject('no db instance')
        } else {
            let transaction = db.transaction("exercises", "readwrite");
            let exercises = transaction.objectStore("exercises")

            let request = exercises.add(item);
            request.onsuccess = () => { resolve(item); }
            request.onerror = () => { reject('error by saving exercise item') }
        }
    })

    return await promise;
}

const API = { getExercises, saveExerciseItem };

export default API;