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
const Martials_1 = __importDefault(require("./Martials"));
const Reviews_Replies_1 = __importDefault(require("./Reviews_Replies"));
const Users_1 = __importDefault(require("./Users"));
let Reviews = class Reviews extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "period", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Reviews.prototype, "comment", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "score", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "practicality", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "muscle", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "difficulty", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "intensity", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "injury", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Reviews_Replies_1.default),
    __metadata("design:type", Array)
], Reviews.prototype, "reviews_replies", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Martials_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "Martials_id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Users_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Reviews.prototype, "Users_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Martials_1.default),
    __metadata("design:type", Martials_1.default)
], Reviews.prototype, "martials", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Users_1.default),
    __metadata("design:type", Users_1.default)
], Reviews.prototype, "users", void 0);
Reviews = __decorate([
    sequelize_typescript_1.Table({
        tableName: "Reviews",
        timestamps: true,
    })
], Reviews);
exports.default = Reviews;
