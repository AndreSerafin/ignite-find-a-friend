import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): () => import("@prisma/client/runtime/library").JsPromise<void>;
    onModuleDestroy(): () => import("@prisma/client/runtime/library").JsPromise<void>;
}
