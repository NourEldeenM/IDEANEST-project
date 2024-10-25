export class AppError extends Error {
	statusCode: number;
	errors: string | undefined;

	constructor(
		name: string,
		message: string,
		statusCode: number,
		errors?: string | undefined,
	) {
		super(message);
		this.name = name ?? "Application Error";
		this.message = message;
		this.statusCode = statusCode;
		this.errors = errors ?? undefined;
	}

	static notFound(message: string) {
		return new AppError("NotFoundError", message, 404);
	}
	static badRequest(message: string, errors?: string | undefined) {
		return new AppError("BadRequestError", message, 400, errors);
	}
	static unauthorized(message: string) {
		return new AppError("UnauthorizedError", message, 401);
	}
	static conflict(message: string) {
		return new AppError("ConflictError", message, 409);
	}
	static internalServer(message: string) {
		return new AppError("InternalServerError", message, 500);
	}
}
