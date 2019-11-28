import { NgModule } from "@angular/core";
import { ProfileCardComponent } from "./profile-card.component";
import { ProfileCardAvatarComponent } from "./profile-card-avatar/profile-card-avatar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [ProfileCardComponent, ProfileCardAvatarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [ProfileCardComponent, ProfileCardAvatarComponent]
})
export class ProfileCardModule {}
