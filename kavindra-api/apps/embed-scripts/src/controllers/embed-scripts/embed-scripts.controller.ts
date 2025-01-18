import {ApiGatewayRequestHeaders, ApiGatewayRequestHeadersDto} from '@app/auth';
import {Controller, Get, Header} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Embed Scripts')
@Controller()
export class EmbedScriptsController {
  // constructor(private readonly projectsService: ProjectsService) {}

  @Get('feedback-widget.js')
  @Header('Content-Type', 'text/javascript')
  @Header('Cache-Control', 'no-cache, no-store, must-revalidate')
  async getFeedbackWidgetScript(
    @ApiGatewayRequestHeaders()
    {clientSubdomain}: ApiGatewayRequestHeadersDto,
  ) {
    return {clientSubdomain};
    // return this.projectsService.getFeedbackWidgetScript(clientSubdomain);
  }

  @Get('kavindra-widget.js')
  @Header('Content-Type', 'text/javascript')
  async getWidgetScript() {
    return {clientSubdomain: 'kavindra'};
    // return this.projectsService.getWidgetScript();
  }
}
