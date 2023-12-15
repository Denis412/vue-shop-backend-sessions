import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { generateId } from 'src/helpers/generate-id.helper';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private readonly repository: Repository<Coupon>,
  ) {}

  create(input: CreateCouponDto) {
    return this.repository.save({ id: generateId(), ...input });
  }

  findOneByID(id: string) {
    return this.repository.findOneBy({ id });
  }

  findOneByCode(code: string) {
    return this.repository.findOneBy({ code });
  }
}
