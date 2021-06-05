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
const Comments_1 = __importDefault(require("./Comments"));
const Martials_1 = __importDefault(require("./Martials"));
const Reviews_1 = __importDefault(require("./Reviews"));
const Reviews_Replies_1 = __importDefault(require("./Reviews_Replies"));
const Users_Martials_1 = __importDefault(require("./Users_Martials"));
let Users = class Users extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "salt", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Buffer)
], Users.prototype, "img", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Comments_1.default),
    __metadata("design:type", Array)
], Users.prototype, "comments", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Reviews_1.default),
    __metadata("design:type", Array)
], Users.prototype, "reviews", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Reviews_Replies_1.default),
    __metadata("design:type", Array)
], Users.prototype, "reviews_replies", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Martials_1.default, () => Users_Martials_1.default),
    __metadata("design:type", Array)
], Users.prototype, "martials", void 0);
Users = __decorate([
    sequelize_typescript_1.Table({
        tableName: "Users",
        timestamps: true,
    })
], Users);
exports.default = Users;
