import { Repository } from 'typeorm';
import { ProductVariant } from '../entities/ProductVariant';
import AppDataSource from '../config/ormconfig';

export class ProductVariantService {
  private repository: Repository<ProductVariant>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductVariant);
  }

  /**
   * Create a new ProductVariant
   * @param data Partial data to create a ProductVariant
   * @returns The created ProductVariant
   */
  async create(data: Partial<ProductVariant>): Promise<ProductVariant> {
    const productVariant = this.repository.create(data);
    return await this.repository.save(productVariant);
  }

  /**
   * Retrieve all ProductVariants
   * @returns An array of ProductVariant
   */
  async getAll(): Promise<ProductVariant[]> {
    return await this.repository.find({ relations: ['product'] });
  }

  /**
   * Retrieve a ProductVariant by its ID
   * @param id ID of the ProductVariant
   * @returns The ProductVariant or null if not found
   */
  async getById(id: number): Promise<ProductVariant | null> {
    return await this.repository.findOne({ where: { id }, relations: ['product'] });
  }

  /**
   * Update an existing ProductVariant
   * @param id ID of the ProductVariant to update
   * @param data Partial data to update the ProductVariant
   * @returns The updated ProductVariant or null if not found
   */
  async update(id: number, data: Partial<ProductVariant>): Promise<ProductVariant | null> {
    const productVariant = await this.getById(id);
    if (!productVariant) return null;

    Object.assign(productVariant, data);
    return await this.repository.save(productVariant);
  }

  /**
   * Delete a ProductVariant by its ID
   * @param id ID of the ProductVariant to delete
   * @returns True if deleted, otherwise false
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}