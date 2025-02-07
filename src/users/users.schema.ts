import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "./role.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ unique: true, lowercase: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: Role.User, enum: Role })
    role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);