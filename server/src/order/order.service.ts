import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import * as dayjs from "dayjs";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  create(createOrderDto: CreateOrderDto) {
    // 9시 표준시각으로 접수일을 맞추기 위해
    if (createOrderDto.orderDate) {
      createOrderDto.orderDate = new Date(dayjs(createOrderDto.orderDate).format("YYYY-MM-DD"));
    }
    console.log(createOrderDto);
    return this.orderRepository.save(createOrderDto);
  }

  findAll() {
    return this.orderRepository.find({ relations: ["company"] });
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id: id }, relations: ["company"] });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    // 9시 표준시각으로 접수일을 맞추기 위해
    if (updateOrderDto.orderDate) {
      updateOrderDto.orderDate = new Date(dayjs(updateOrderDto.orderDate).format("YYYY-MM-DD"));
    }
    return this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
