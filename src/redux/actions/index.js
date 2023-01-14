export const SAVE_EMAIL = 'SAVE_EMAIL';

const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
  payload: {
    email,
  },
});
export default saveEmail;
