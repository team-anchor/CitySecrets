import { user, USER_AUTH } from './reducers';

describe('User reducer', () => {
  it('initializes to null', () => {
    const state = user(undefined, {});
    expect(state).toBeNull();
  });

  it('loads a user', () => {
    const data = { name: 'user' };
    const state = user(null, { type: USER_AUTH, payload: data });
    expect(state).toEqual(data);
  });
});