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
import {Producte} from '../models';
import {ProducteRepository} from '../repositories';

export class ProducteController {
  constructor(
    @repository(ProducteRepository)
    public producteRepository : ProducteRepository,
  ) {}

  @post('/productes')
  @response(200, {
    description: 'Producte model instance',
    content: {'application/json': {schema: getModelSchemaRef(Producte)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producte, {
            title: 'NewProducte',
            exclude: ['id'],
          }),
        },
      },
    })
    producte: Omit<Producte, 'id'>,
  ): Promise<Producte> {
    return this.producteRepository.create(producte);
  }

  @get('/productes/count')
  @response(200, {
    description: 'Producte model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Producte) where?: Where<Producte>,
  ): Promise<Count> {
    return this.producteRepository.count(where);
  }

  @get('/productes')
  @response(200, {
    description: 'Array of Producte model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Producte, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Producte) filter?: Filter<Producte>,
  ): Promise<Producte[]> {
    return this.producteRepository.find(filter);
  }

  @patch('/productes')
  @response(200, {
    description: 'Producte PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producte, {partial: true}),
        },
      },
    })
    producte: Producte,
    @param.where(Producte) where?: Where<Producte>,
  ): Promise<Count> {
    return this.producteRepository.updateAll(producte, where);
  }

  @get('/productes/{id}')
  @response(200, {
    description: 'Producte model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Producte, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Producte, {exclude: 'where'}) filter?: FilterExcludingWhere<Producte>
  ): Promise<Producte> {
    return this.producteRepository.findById(id, filter);
  }

  @patch('/productes/{id}')
  @response(204, {
    description: 'Producte PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producte, {partial: true}),
        },
      },
    })
    producte: Producte,
  ): Promise<void> {
    await this.producteRepository.updateById(id, producte);
  }

  @put('/productes/{id}')
  @response(204, {
    description: 'Producte PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() producte: Producte,
  ): Promise<void> {
    await this.producteRepository.replaceById(id, producte);
  }

  @del('/productes/{id}')
  @response(204, {
    description: 'Producte DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.producteRepository.deleteById(id);
  }
}
