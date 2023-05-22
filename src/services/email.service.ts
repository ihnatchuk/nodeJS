import path from "node:path";

import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";

import { configs } from "../configs";
import { allTemplates } from "../constants";
import { EEmailActions } from "../enums";

class EmailService {
  private transporter: Transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // user: configs.NO_REPLY_EMAIL,
        user: "backproject2023@gmail.com",
        // pass: configs.NO_REPLY_EMAIL_PASSWORD,
        pass: "vowgpngpycpselhf",
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "statics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "statics", "css"),
        },
      },
    });
  }

  public async sendMail(
    email: string | string[],
    emailAction: EEmailActions,
    locals: Record<string, string> = {}
  ) {
    try {
      const templateInfo = allTemplates[emailAction];
      locals.frontUrl = configs.FRONT_URL;
      // locals.frontUrl = "http://localhost:3000";

      const html = await this.templateParser.render(
        templateInfo.templateName,
        locals
      );

      return this.transporter.sendMail({
        from: "No reply",
        to: email,
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      console.error(e.message);
    }
  }
}

export const emailService = new EmailService();
