"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Reviews_1 = __importDefault(require("./Reviews"));
const Users_1 = __importDefault(require("./Users"));
let Reviews_Replies = class Reviews_Replies extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews_Replies.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Reviews_Replies.prototype, "comment", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Users_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews_Replies.prototype, "Users_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Users_1.default),
    __metadata("design:type", Users_1.default)
], Reviews_Replies.prototype, "users", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Reviews_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews_Replies.prototype, "Reviews_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Reviews_1.default),
    __metadata("design:type", Reviews_1.default)
], Reviews_Replies.prototype, "reviews", void 0);
Reviews_Replies = __decorate([
    sequelize_typescript_1.Table({
        tableName: "Reviews_Replies",
        timestamps: true,
    })
], Reviews_Replies);
exports.default = Reviews_Replies;
