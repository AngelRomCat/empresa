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
import {Comanda} from '../models';
import {ComandaRepository} from '../repositories';

export class ComandaController {
  constructor(
    @repository(ComandaRepository)
    public comandaRepository : ComandaRepository,
  ) {}

  @post('/comandas')
  @response(200, {
    description: 'Comanda model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comanda)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comanda, {
            title: 'NewComanda',
            exclude: ['id'],
          }),
        },
      },
    })
    comanda: Omit<Comanda, 'id'>,
  ): Promise<Comanda> {
    return this.comandaRepository.create(comanda);
  }

  @get('/comandas/count')
  @response(200, {
    description: 'Comanda model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comanda) where?: Where<Comanda>,
  ): Promise<Count> {
    return this.comandaRepository.count(where);
  }

  @get('/comandas')
  @response(200, {
    description: 'Array of Comanda model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comanda, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comanda) filter?: Filter<Comanda>,
  ): Promise<Comanda[]> {
    return this.comandaRepository.find(filter);
  }

  @patch('/comandas')
  @response(200, {
    description: 'Comanda PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comanda, {partial: true}),
        },
      },
    })
    comanda: Comanda,
    @param.where(Comanda) where?: Where<Comanda>,
  ): Promise<Count> {
    return this.comandaRepository.updateAll(comanda, where);
  }

  @get('/comandas/{id}')
  @response(200, {
    description: 'Comanda model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comanda, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Comanda, {exclude: 'where'}) filter?: FilterExcludingWhere<Comanda>
  ): Promise<Comanda> {
    return this.comandaRepository.findById(id, filter);
  }

  @patch('/comandas/{id}')
  @response(204, {
    description: 'Comanda PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comanda, {partial: true}),
        },
      },
    })
    comanda: Comanda,
  ): Promise<void> {
    await this.comandaRepository.updateById(id, comanda);
  }

  @put('/comandas/{id}')
  @response(204, {
    description: 'Comanda PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() comanda: Comanda,
  ): Promise<void> {
    await this.comandaRepository.replaceById(id, comanda);
  }

  @del('/comandas/{id}')
  @response(204, {
    description: 'Comanda DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.comandaRepository.deleteById(id);
  }
}
