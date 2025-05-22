import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CounterDto, CounterReadingDto } from './counter.dto';

@Injectable()
export class CounterService {
  constructor(private prisma: PrismaService) {}

  async getById(counterId: string) {
    return this.prisma.flatCounter.findUnique({
      where: {
        id: counterId
      }
    })
  }

  async getAll(flatId: string) {
    return this.prisma.flatCounter.findMany( {
      include: {
        flatCounterReadings: true
      },
      where: {
        flatId
      }
    })
  }

  async create(dto: CounterDto, flatId: string, userId : string) {
    const flat = await this.prisma.flat.findUnique({
      where: {
        id: flatId,
        // OR: [
        //   {
        //     creatorId: userId
        //   },
        //   {
        //     owners: {
        //       some: {
        //         id: userId
        //       }
        //     }
        //   },
        //   {
        //     managers: {
        //       some: {
        //         id: userId
        //       }
        //     }
        //   }
        // ]
      }
    });

    if (!flat) {
      throw new NotFoundException('Flat not found');
    }
    
    return this.prisma.flatCounter.create({
      data: {
        ...dto,
        flat: {
          connect: {
            id: flatId
          }
        }
      }
    })
  }

  async update(dto: CounterDto, counterId: string, userId : string) {
    const flatCounter = await this.prisma.flatCounter.findUnique({
      where: {
        id: counterId
      },
      select: {
        flatId: true
      }
    });
    const flat = await this.prisma.flat.findUnique({
      where: {
        id: flatCounter.flatId,
        // OR: [
        //   {
        //     creatorId: userId
        //   },
        //   {
        //     owners: {
        //       some: {
        //         id: userId
        //       }
        //     }
        //   },
        //   {
        //     managers: {
        //       some: {
        //         id: userId
        //       }
        //     }
        //   }
        // ]
      }
    });

    if (!flat) {
      throw new NotFoundException('Flat not found');
    }
    return this.prisma.flatCounter.update({
      where: {
        id: counterId
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }

  async delete(counterId : string, userId : string) {
    const flatCounter = await this.prisma.flatCounter.findUnique({
      where: {
        id: counterId
      },
      select: {
        flatId: true
      }
    });
    const flat = await this.prisma.flat.findUnique({
      where: {
        id: flatCounter.flatId,
        // OR: [
        //   {
        //     creatorId: userId
        //   },
        //   {
        //     owners: {
        //       some: {
        //         id: userId
        //       }
        //     }
        //   },
        //   {
        //     managers: {
        //       some: {
        //         id: userId
        //       }
        //     }
        //   }
        // ]
      }
    });

    if (!flat) {
      throw new NotFoundException('Flat not found');
    }
    
    return this.prisma.flatCounter.delete({
      where: {
        id: counterId
      }
    })
  }

  async addReading(dto: CounterReadingDto, userId : string, counterId : string){
    const counter = await this.prisma.flatCounter.findUnique({
      where: {
        id: counterId,
        flat: {
          // creatorId: userId,
          // OR : [
          //   {
          //     owners: {
          //       some: {
          //         id: userId
          //       }
          //     }
          //   },
          //   {
          //     managers: {
          //       some: {
          //         id: userId
          //       }
          //     }
          //   },
          //   {
          //     renters: {
          //       some: {
          //         id: userId
          //       }
          //     }
          //   }
          // ]
        }
      }
    }) 

    if (!counter) {
      throw new NotFoundException('Counter not found');
    }

    return this.prisma.flatCounterReadings.create({
      data: {
        ...dto,
        flatCounter: {
          connect : {
            id: counterId
          }
        }
      }
    })
  }

  async removeReading(readingId : string, userId : string) {
    const reading = await this.prisma.flatCounterReadings.findUnique({
      where: {
        id: readingId,
        flatCounter: {
          flat: {
            // creatorId: userId,
            // OR : [
            //   {
            //     owners: {
            //       some: {
            //         id: userId
            //       }
            //     }
            //   },
            //   {
            //     managers: {
            //       some: {
            //         id: userId
            //       }
            //     }
            //   },
            //   {
            //     renters: {
            //       some: {
            //         id: userId
            //       }
            //     }
            //   }
            // ]
          }
        }
      }
    })

    if (!reading) {
      throw new NotFoundException('Reading not found');
    }

    return this.prisma.flatCounterReadings.delete({
      where: {
        id: readingId
      }
    })
  }


}
