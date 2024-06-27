import { IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  readonly content: string;
}
