import { IsNotEmpty } from 'class-validator';

export class GetLinkParams {
  @IsNotEmpty()
  id: string;
}
