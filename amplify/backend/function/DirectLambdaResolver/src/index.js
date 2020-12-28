let response;

exports.handler = async (event, context) => {
    console.log({event, context})
    try {
        response = "this lambda is super direct"
    } catch (err) {
        console.log({err})
        console.log(err);
        return err;
    }

    return response
};
