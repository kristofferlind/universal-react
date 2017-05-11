export function generateId() {
  return (new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 9));
}

export default {
  generateId
};
