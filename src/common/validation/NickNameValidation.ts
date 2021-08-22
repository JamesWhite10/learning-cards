export const nickNameValidation = (value: string) => {
    return /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/i.test(value)
}