import got from 'got';
import * as FormData from 'form-data';
import { MailModuleOptions } from './mail.interfaces';
import { CONFIG_OPTIONS } from './../common/common.constants';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    this.sendEmail('testing', 'test')
      .then(() => {
        console.log('Message sent');
      })
      .catch((error) => {
        console.log(error.response.body);
      });
  }
  private async sendEmail(subject: string, content: string) {
    const form = new FormData();
    form.append(
      'from',
      `Jeongkong from Nuber2 <mailgun@${this.options.domain}>`,
    );
    form.append('to', `jeongkong000@naver.com`);
    form.append('subject', subject);
    form.append('text', content);
    form.append('v:code','jeong');
    form.append('v:username','bin');

    try {
        await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        });
      } catch (error) {
        console.log(error);
      }
    }
}
