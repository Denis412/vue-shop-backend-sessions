import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body('input') input: CreateCouponDto) {
    return this.couponService.create(input);
  }

  // @Get(':id')
  // findOneById(@Param('id') id: string) {
  //   return this.couponService.findOneByID(id);
  // }

  @Get(':code')
  findOneByCode(@Param('code') code: string) {
    return this.couponService.findOneByCode(code);
  }
}
