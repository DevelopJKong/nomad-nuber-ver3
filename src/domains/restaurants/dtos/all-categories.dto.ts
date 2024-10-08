import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { CoreOutput } from '../../../common/dtos/output.dto';

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}
