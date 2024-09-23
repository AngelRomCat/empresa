import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DetallDeLaComanda} from '../models';
import {DetallDeLaComandaRepository} from '../repositories';

export class DetallController {
  constructor(
    @repository(DetallDeLaComandaRepository)
    public detallDeLaComandaRepository : DetallDeLaComandaRepository,
  ) {}

  @post('/detall')
  @response(200, {
    description: 'DetallDeLaComanda model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetallDeLaComanda)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallDeLaComanda, {
            title: 'NewDetallDeLaComanda',
            exclude: ['id'],
          }),
        },
      },
    })
    detallDeLaComanda: Omit<DetallDeLaComanda, 'id'>,
  ): Promise<DetallDeLaComanda> {
    return this.detallDeLaComandaRepository.create(detallDeLaComanda);
  }

  @get('/detall/count')
  @response(200, {
    description: 'DetallDeLaComanda model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetallDeLaComanda) where?: Where<DetallDeLaComanda>,
  ): Promise<Count> {
    return this.detallDeLaComandaRepository.count(where);
  }

  @get('/detall')
  @response(200, {
    description: 'Array of DetallDeLaComanda model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetallDeLaComanda, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetallDeLaComanda) filter?: Filter<DetallDeLaComanda>,
  ): Promise<DetallDeLaComanda[]> {
    return this.detallDeLaComandaRepository.find(filter);
  }

  @patch('/detall')
  @response(200, {
    description: 'DetallDeLaComanda PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallDeLaComanda, {partial: true}),
        },
      },
    })
    detallDeLaComanda: DetallDeLaComanda,
    @param.where(DetallDeLaComanda) where?: Where<DetallDeLaComanda>,
  ): Promise<Count> {
    return this.detallDeLaComandaRepository.updateAll(detallDeLaComanda, where);
  }

  @get('/detall/{id}')
  @response(200, {
    description: 'DetallDeLaComanda model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetallDeLaComanda, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DetallDeLaComanda, {exclude: 'where'}) filter?: FilterExcludingWhere<DetallDeLaComanda>
  ): Promise<DetallDeLaComanda> {
    return this.detallDeLaComandaRepository.findById(id, filter);
  }

  @patch('/detall/{id}')
  @response(204, {
    description: 'DetallDeLaComanda PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallDeLaComanda, {partial: true}),
        },
      },
    })
    detallDeLaComanda: DetallDeLaComanda,
  ): Promise<void> {
    await this.detallDeLaComandaRepository.updateById(id, detallDeLaComanda);
  }

  @put('/detall/{id}')
  @response(204, {
    description: 'DetallDeLaComanda PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() detallDeLaComanda: DetallDeLaComanda,
  ): Promise<void> {
    await this.detallDeLaComandaRepository.replaceById(id, detallDeLaComanda);
  }

  @del('/detall/{id}')
  @response(204, {
    description: 'DetallDeLaComanda DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.detallDeLaComandaRepository.deleteById(id);
  }
}
