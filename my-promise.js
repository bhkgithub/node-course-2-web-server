var getValue = (input) => {
    var promise = new Promise((resolve, reject) => {
        if(input > 0) {
            resolve('Promise resolved');
        } else {
            reject('Promise rejected');
        }
    });

    return promise;
};

module.exports = {
    getValue
};