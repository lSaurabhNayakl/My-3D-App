import { RouterModule, Routes } from "@angular/router";
import { FirstSceneComponent } from "./first-scene/first-scene.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: '',
      component: FirstSceneComponent,
    //   children: [
    //   ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class FisrtSceneRoutingModule {}