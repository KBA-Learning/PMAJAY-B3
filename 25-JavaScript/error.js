try {
    // Code that might throw an error
    let result = riskyOperation();
    console.log(result);
} catch (error) {
    // Code to handle the error
    console.log('An error occurred: '+ error.message);
} finally {
    // Code that runs regardless of an error
    console.log('This will always run!');
}

function riskyOperation(){
    let obj;
    obj.property; //This will throw an error
}
