import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-profile-card-avatar",
  templateUrl: "./profile-card-avatar.component.html",
  styleUrls: ["./profile-card-avatar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardAvatarComponent {
  @Input() avatar: string;
  @Input() firstName: string;
  @Input() surname: string;
  @Input() jobTitle: string;
  @Input() isActive: boolean;
}
