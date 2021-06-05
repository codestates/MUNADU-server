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
const Users_1 = __importDefault(require("./Users"));
let Comments = class Comments extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comments.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Comments.prototype, "comment", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Users_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comments.prototype, "Users_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Users_1.default),
    __metadata("design:type", Users_1.default)
], Comments.prototype, "users", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Martials_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comments.prototype, "Martials_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Martials_1.default),
    __metadata("design:type", Martials_1.default)
], Comments.prototype, "martials", void 0);
Comments = __decorate([
    sequelize_typescript_1.Table({
        tableName: "Comments",
        timestamps: true,
    })
], Comments);
exports.default = Comments;
