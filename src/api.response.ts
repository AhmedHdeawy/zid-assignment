export default (status: number, message: string, data: any = null, errors: any = null) => ({
    status,
    message,
    data,
    errors,
})