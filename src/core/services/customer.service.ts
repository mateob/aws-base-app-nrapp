import { CustomerAttributes, CustomerModel } from '@entities/customer.model';
import { CustomerRepository } from '@repositories/customer.repository';
/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';
import { ServiceBase } from './base/service-base';

export class CustomerService extends ServiceBase<CustomerModel, CustomerAttributes> {
  repository: CustomerRepository;

  private readonly registrationToken: string[] = [
    'cqReiUdQ3tlwZg2xUNtdLX:APA91bGh77kxcL2oIzRITJUHxdTPkS7slO0AUbKTxc_SavUTIMvgvbYzjmqj_0k_wKn9wWOSnqydzgZ1eYraUgE1GenDINtdHKUzdHaMTbYhwzKTHN_rEzdXfgy-6fBtGskYsfWcN3MN',
    'eXQ4OynX4072rfdTLT6uuk:APA91bHVGKATOcDUazLXGfCWrp_NKSAyaKiY0Q-XOkjlXhpAefzft8ilDbkqwNf2T3SeF830OL-r2QDMXSlKYv8w85i_2va0YtOUs-AVuptfHDn_qqnt2P4-YS7TQ3pJIu1f5yZcapUv',
    'cA9FfAZ2Q5eXgaknbNwgcD:APA91bF1X2_iK-5hE7l5MZNWfPaBrgrcMK9le1TCFJJlJ5pyCkjQ3_kqYS4MUixz2AZNU7q8Wo4gxnOHpn3hhGOk1O7RJif4eZ8ftKOf1wZSDPsacS6yTWTd-yZlORpSqZpzoyZOVCr-',
    'eMuD1Lkc-UNYi7eSsHlTg2:APA91bEKZRpYckCP9rtyBEaY9m-Ra1hoVdUartebt9PwKFE2aAGvHPosnkTkR8FJfV7ETfBq-yulXyXH0AKuhKBrJPklhbODS72kumSDM-JakG15FJUb8kMgoOsIEEZUh0-0HuK6kGy9',
    'e6Mz-8VnJu9xMG4fQzSfER:APA91bHE11POt0C6VzOJIs6tUXX3SDtzYmXtDy4eyxN9OL5_1ZK3Unf5By2Gy97HlI-FkN8HE--MSQ9N_GwJM8Eo_ZBNznHbYi0nzewSEp5DaK7c9HfW60Kz4kCx6JjT9--D-Me-fa4Z',
  ];

  public sendNotification() {
    initializeApp({
      credential: credential.cert({
        projectId: 'fb-noctua-push-app',
        clientEmail: 'firebase-adminsdk-cpf2o@fb-noctua-push-app.iam.gserviceaccount.com',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCiL+SES8TeHYT7\n9GHJiZcWF9/FPR/zweKsVP228HIgajcJruY6CzuXPlMZf6Na4eBs/Z7Ym0aDpOOn\n+1p3ALTe9HBVK2k9q1RwUpwyHRaYzXg3AfWAs6iXUlQO1puqpUH1szSGm5+xPOq0\nQ2ffDCXSWxBuEOWK1Pg/ujjgmXjRnmzH9snC+KM3y8q/99kypM/oKmCUUL8D8aTX\n/QPCWUVPRDlk1VqeCXwBPNKvZEhWdFUEBPdpBF1zpOBdw0ljRgCm0O+LGLgzhuqa\nnFVmYKicwsY6K1kvGhE7lZqEhFCzgeivgv6PxY+3QHNiq15BDrZJbcTrw9lwXruB\ndJXm0x8zAgMBAAECggEAMrHvpt6cIaVufObNbhaA0FoUCu3pP+MZvC4ww+7ybWll\n3LP7qKb8MHE9vlmkMPMrmEXKUgBvERUIR+iMRWhGIO6c8jJIigs0sItR4WQwPQD0\nk5UcLOd7ShlkxuKT88oGDQu/3ldkmhzlbAUpwZFlfRQT1aOYbEXXduv5fVLbbgGs\nYz8AgZeNh0lmLmSg5IaYeBW8hsD9tb5l75D/AOSVDedyPBxCcqbYVLlknW9zmcWH\npqgbOV2jnM/75WAcYu0jq+L3bS/wA+KuTuMgVymKdVLTBZ9wP+MbXWgwl0EpMCFS\nwB8e68tm/46lTReBmfVmN/Mtbt+L1SnDpSjUQDZy2QKBgQDafh+1GHyAwLvc3/HB\n4zQyXG6eXm1APQW28Waf/QK93JEX3Ije7RODRTd7Ewv3q+Otl0t3gcpQBrTmGnvE\n1fC6kUmg2STIPeeb/8aJCyQg6h91Yg3WIEyZ+kWESGgBQdL96pGuYQtijaHz6L54\nsQHEn5Q8dwJV3CwIxw9gNJ8qFQKBgQC+B10wRtvFs8X3Zn5Lrt99CGNPYeV9KxIf\nvS+YXzSjVczveaVqvxqM51a31uE+ZJfPOaPeb87BAETcSmcM8X1U3h8hAR3TF/4h\nqKBYkYy3GbWRzDmU6XHcLI+b3yLqakQlBkc94CRz+7jn4QpEtWqbPiIysFqnv6rf\nB97ZlKBeJwKBgQCrEJpkoEJCUCQF37QZmHiygVn+VnH1HJHP1RsDYgV2fy1+YCUt\nXLKtUVEJ5DS3efXtYIoujAjJNScHDW8gAlzSxZO/AqPgv08J/W0EuRtVRdjRf67T\nmkA/QgqRclszuMSoFrJus/5E8Bz/qZcPSY7X0hUubgL/FD3JtYidSzXerQKBgFKm\nMUnGB+A9CGVKFrQkIt/mvgrQsVd3XDKhvgmvnt1LfA7MAb4j0BBorbbXpq/UYJKo\npzUfu/UFgO2vDpL6lWBMG43nRmmBje5lwRfEdkdMz0PSZ1j1D6iLWQqaSj1aarkP\nufyXeENZwFpZ7nVj0jIjHAyf104Odur6KVrI4dcRAoGAWCUpcEZnG5kGkxmZYkiQ\n1Qpmgv2iX1eMintCFn+vY2iN0VxqUJhOy0crUd2y5ap2AFPZ4PjAihcl8uNBp6MV\nlPm/LMsX7MUF9VUykkORPFF9sHUSsHN3BMdykiR+enJfAAP+OfZCvMUZPa5Nr4da\nPGDLFt5kSeWBZOtOzukN75E=\n-----END PRIVATE KEY-----\n',
      }),
    });

    getMessaging().sendMulticast({
      notification: {
        title: 'Mensagem do Back',
        body: 'Corpo da mensagem vinda do back',
      },
      data: {
        route: '',
        isAction: 'true',
        dataAction: '{}', // TODO: Tem que passar um JSON
      },
      tokens: this.registrationToken,
    }).then((resp) => console.log('Envio de mensagem: ', resp));
  }
}
