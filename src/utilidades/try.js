const TryCatch = async (query) => {
    try {
        return {
            error: false,
            data: await query()
        }
    } catch (error) {
        return {
            error: true,
            data: error
        }
    }
}

module.exports = TryCatch