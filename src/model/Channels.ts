import {
  Model,
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface ChannelsI {
  id?: number | null;
  name: string;
  caption: string;
  url: string;
  img: string;
}

@Table({
  tableName: "Channels",
  timestamps: true,
})
export default class Channels extends Model implements ChannelsI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  caption!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  url!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  img!: string;
}
