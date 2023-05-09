import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { SelectCompanyDto } from "./dto/select-company.dto";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll(params: SelectCompanyDto) {
    const where = {};
    // 기간 설정
    if (params.DateFrom && params.DateTo) {
      where["orders.orderDate"] = Between(params.DateFrom, params.DateTo); // 'between' 검색
    } else if (params.DateFrom) {
      where["orders.orderDate"] = MoreThanOrEqual(params.DateFrom); // '>=' 검색
    } else if (params.DateTo) {
      where["orders.orderDate"] = LessThanOrEqual(params.DateTo); // '<=' 검색
    }
    console.log("where = ", where);
    return this.companyRepository.find({
      relations: ["orders"],
      where: where
    });
  }

  findOne(id: number, params: SelectCompanyDto) {
    return (
      this.companyRepository
        .createQueryBuilder("company")
        .leftJoinAndSelect("company.orders", "orders")
        .where("company.id = :id", { id: id })
        // 기간 설정
        .andWhere(
          params.DateFrom && params.DateTo
            ? "orders.orderDate BETWEEN :DateFrom AND :DateTo"
            : params.DateFrom
            ? "orders.orderDate >= :DateFrom"
            : params.DateTo
            ? "orders.orderDate <= :DateTo"
            : "1=1",
          {
            DateFrom: params.DateFrom,
            DateTo: params.DateTo
          }
        )
        .getMany()
    );
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update(id, updateCompanyDto);
  }

  remove(id: number) {
    return this.companyRepository.delete(id);
  }
}
