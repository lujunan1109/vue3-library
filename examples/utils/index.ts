/**
 * 处理async await 接口报错问题
 */
export async function handleRequest<T>(request: Promise<T>): Promise<[T | null, Error | null]> {
  try {
    const response = await request;
    return [response, null];
  } catch (error) {
    return [null, error];
  }
}
