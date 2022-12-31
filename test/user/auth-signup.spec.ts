import * as supertest from 'supertest';
import { BASE_URL } from '../tests.contants';
import { signUpUser } from './auth.utils';
import { expect } from 'chai';

describe('Success sign up user', () => {
  const request = supertest(BASE_URL);
  const payload = signUpUser();
  let user;

  it('POST /auth/signup', async () => {
    const res = await request.post('/auth/signup').send(payload).expect(201);
    user = res.body;
    expect(res.body).to.have.property('username').to.be.eq(payload.username);
    expect(res.body).to.have.property('email').to.be.eq(payload.email);
    expect(res.body).to.have.property('id').to.be.a('number');
    expect(res.body).not.to.have.property('password');
    expect(res.body)
      .to.have.property('isConfirmed')
      .to.be.a('boolean')
      .to.be.eq(false);
  });

  afterAll(async () => {
    await request.delete(`/user/${user.id}`).expect(200);
  });
});
