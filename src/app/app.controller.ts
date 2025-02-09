import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @All()
  @ApiExcludeEndpoint()
  public async getHello(
    @Res() res: Response
  ) {
    return res.redirect('/swagger');
  }

  @All('/mp')
  @ApiExcludeEndpoint()
  public async getMp(
    @Res() res: Response
  ) {
    return res.send('MP');
  }

}
