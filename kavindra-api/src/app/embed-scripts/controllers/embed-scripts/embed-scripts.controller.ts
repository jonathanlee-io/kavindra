import {Controller, Get, Header, HostParam} from '@nestjs/common';

import {Public} from '../../../../lib/auth/supabase/decorators/is-public.decorator';
import {host} from '../../../../lib/config/host.config';
import {ClientParamDto} from '../../../../lib/dto/ClientParam.dto';
import {ProjectsService} from '../../../projects/services/projects/projects.service';

@Controller({host})
export class EmbedScriptsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get('feedback-widget-init-script.js')
  @Header('Content-Type', 'text/javascript')
  @Header('Cache-Control', 'no-cache, no-store, must-revalidate')
  async getFeedbackWidgetScript(
    @HostParam() {client: clientSubdomain}: ClientParamDto,
  ) {
    return this.projectsService.getFeedbackWidgetScript(clientSubdomain);
  }

  @Public()
  @Get('kavindra-widget.js')
  @Header('Content-Type', 'text/javascript')
  async getWidgetScript() {
    return this.projectsService.getWidgetScript();
  }
}
