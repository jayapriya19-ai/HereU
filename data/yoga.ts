import type { TranslationKeys } from "../i18n/locales";

export interface YogaPose {
  nameKey: TranslationKeys;
  durationSeconds: number;
  imageUrl: string;
  animatedImageUrl: string;
}

export interface YogaProgram {
  id: string;
  titleKey: TranslationKeys;
  descriptionKey: TranslationKeys;
  durationMinutes: number;
  imageUrl: string;
  videoUrl: string;
  poses: YogaPose[];
}

const poseAssets = {
    mountain: {
        static: 'https://images.pexels.com/photos/4056557/pexels-photo-4056557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2NpYndpZmd6azgzanRrbmF6c3JkM2RqdDRpZDU2eHJ5ZTV4Mzh1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/J2q84d05vI4Y1D5G8c/giphy.gif',
    },
    upward_salute: {
        static: 'https://images.pexels.com/photos/7290161/pexels-photo-7290161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2R4dGZtcnNtb2N3cHI0ZWJvcnhqd3d2MHJzMDBjZzB2ZzlmcXR0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LpD565vWcV3kA2w646/giphy.gif',
    },
    forward_fold: {
        static: 'https://images.pexels.com/photos/6785199/pexels-photo-6785199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExajE1MWZwdXN5MXFhc3I3ZWJ1eGpkaGtmdjR3M2NuaXVpcjZocmhxMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fBGPj1Xcb2g907dw3Q/giphy.gif',
    },
    halfway_lift: {
        static: 'https://images.pexels.com/photos/7671173/pexels-photo-7671173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Y1d3d6Z2E0NnN4eTdpdHd0Zmd1Nmt0Z3VhcXJ2cnVqOXd2cG16ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5hysb22xdz2aWdG24Y/giphy.gif',
    },
    plank: {
        static: 'https://images.pexels.com/photos/3822669/pexels-photo-3822669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2s5cGFoYnhnZnJ5bXBkbHk4cDBzNWZmMHZodDk0NXh1emR0a21hYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/U8T3o8km3aYkO55i5G/giphy.gif',
    },
    downward_dog: {
        static: 'https://images.pexels.com/photos/3822722/pexels-photo-3822722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzFpMnF6cGZwdGk4d2V2aXk0MW9oMm0yZ3lkc21ndXh3ZTVxdGNmMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ZrqfFdeF3X2x42D0aB/giphy.gif',
    },
    cat_cow: {
        static: 'https://images.pexels.com/photos/4056515/pexels-photo-4056515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzhia3E3cmIzdHV3c3M4a2EzeW00aXl1M2k5cGQ0NWp4dHRoYW1udCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/mqse22L4Tf2jBoi3dE/giphy.gif',
    },
    seated_spinal_twist: {
        static: 'https://images.pexels.com/photos/3822363/pexels-photo-3822363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2Q3dGd4emk2dWN1ZDJ4c21mbDFrbHlzOXdsMHBtYTVpcTNhb29kdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Q56sf4B54b38Q3mG6n/giphy.gif',
    },
    neck_stretch: {
        static: 'https://images.pexels.com/photos/4325458/pexels-photo-4325458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        animated: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGlrMG1hNThqOHd1MWY1NTRiMmx4MGFpcTZpYXRzcHFicjlwbmFocyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/blS0w2dbQkff2JBF6s/giphy.gif',
    },
};

export const YOGA_PROGRAMS_DATA: YogaProgram[] = [
  {
    id: 'morning-1',
    titleKey: 'yoga_title_morning_energizer',
    descriptionKey: 'yoga_desc_morning_energizer',
    durationMinutes: 5,
    imageUrl: 'https://images.pexels.com/photos/3822623/pexels-photo-3822623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-on-a-mat-in-the-woods-42995-large.mp4',
    poses: [
        { nameKey: 'yoga_pose_mountain', durationSeconds: 30, imageUrl: poseAssets.mountain.static, animatedImageUrl: poseAssets.mountain.animated },
        { nameKey: 'yoga_pose_upward_salute', durationSeconds: 30, imageUrl: poseAssets.upward_salute.static, animatedImageUrl: poseAssets.upward_salute.animated },
        { nameKey: 'yoga_pose_forward_fold', durationSeconds: 45, imageUrl: poseAssets.forward_fold.static, animatedImageUrl: poseAssets.forward_fold.animated },
        { nameKey: 'yoga_pose_halfway_lift', durationSeconds: 30, imageUrl: poseAssets.halfway_lift.static, animatedImageUrl: poseAssets.halfway_lift.animated },
        { nameKey: 'yoga_pose_plank', durationSeconds: 30, imageUrl: poseAssets.plank.static, animatedImageUrl: poseAssets.plank.animated },
        { nameKey: 'yoga_pose_downward_dog', durationSeconds: 45, imageUrl: poseAssets.downward_dog.static, animatedImageUrl: poseAssets.downward_dog.animated },
        { nameKey: 'yoga_pose_mountain', durationSeconds: 30, imageUrl: poseAssets.mountain.static, animatedImageUrl: poseAssets.mountain.animated },
    ]
  },
  {
    id: 'stress-1',
    titleKey: 'yoga_title_stress_relief',
    descriptionKey: 'yoga_desc_stress_relief',
    durationMinutes: 10,
    imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-leg-split-at-the-beach-42959-large.mp4',
     poses: [
        { nameKey: 'yoga_pose_downward_dog', durationSeconds: 60, imageUrl: poseAssets.downward_dog.static, animatedImageUrl: poseAssets.downward_dog.animated },
        { nameKey: 'yoga_pose_cat_cow', durationSeconds: 90, imageUrl: poseAssets.cat_cow.static, animatedImageUrl: poseAssets.cat_cow.animated },
        { nameKey: 'yoga_pose_forward_fold', durationSeconds: 90, imageUrl: poseAssets.forward_fold.static, animatedImageUrl: poseAssets.forward_fold.animated },
        { nameKey: 'yoga_pose_seated_spinal_twist', durationSeconds: 60, imageUrl: poseAssets.seated_spinal_twist.static, animatedImageUrl: poseAssets.seated_spinal_twist.animated },
    ]
  },
  {
    id: 'desk-1',
    titleKey: 'yoga_title_desk_break',
    descriptionKey: 'yoga_desc_desk_break',
    durationMinutes: 3,
    imageUrl: 'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-stretching-her-body-on-a-yoga-mat-42981-large.mp4',
     poses: [
        { nameKey: 'yoga_pose_neck_stretch', durationSeconds: 45, imageUrl: poseAssets.neck_stretch.static, animatedImageUrl: poseAssets.neck_stretch.animated },
        { nameKey: 'yoga_pose_seated_spinal_twist', durationSeconds: 60, imageUrl: poseAssets.seated_spinal_twist.static, animatedImageUrl: poseAssets.seated_spinal_twist.animated },
        { nameKey: 'yoga_pose_cat_cow', durationSeconds: 60, imageUrl: poseAssets.cat_cow.static, animatedImageUrl: poseAssets.cat_cow.animated },
    ]
  },
];