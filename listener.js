const firstListener = function (value) {
    console.log(value)
};

const errorListener = (error) => {
    // throw new Error(error);
    console.log('some error: ' + error);
}

module.exports = {
    firstListener: firstListener,
    errorListener: errorListener
};

