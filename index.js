console.log(`index.js loaded \n${Date()}`);

(async function(){
    E = (await import('./eutils.mjs'))
    if(typeof(define)!='undefined'){ // in the odd chance someone is still using require ...
        define(E)
    }
    console.log(E)
})()

console.log(`eutils.mjs loaded at ${Date()}`);