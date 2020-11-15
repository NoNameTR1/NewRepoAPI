import container from './plugins';

container.test().then(()=>{
    console.log(".")
}).catch(err=>{
    console.error(err);
})