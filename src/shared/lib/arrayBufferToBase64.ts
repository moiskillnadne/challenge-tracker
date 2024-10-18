export function arrayBufferToBase64(buffer: number[]): string {
  // Создаём массив из буфера
  const binary = String.fromCharCode(...new Uint8Array(buffer));

  // Преобразуем бинарные данные в строку Base64
  return btoa(binary);
}
