import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import invoice_sample_1 from './invoice_sample_1.jpg'
import invoice_sample_2 from './invoice_sample_2.png'
import invoice_sample_3 from './invoice_sample_3.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import blank from './theme_blank.png'
import zoom_in from './zoom_in.svg'
import zoom_out from './zoom_out.svg'
import stretch_ver from './stretch_ver.svg'
import stretch_hor from './stretch_hor.svg'

export const assets = {
    logo,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon,
    invoice_sample_1,
    invoice_sample_2,
    invoice_sample_3,
    blank,
    zoom_in,
    zoom_out,
    stretch_ver,
    stretch_hor
}

export const stepsData = [
    {
      title: 'Upload Your Invoice',
      description: 'Simply upload your invoice document in any format you have.',
      icon: step_icon_1,
    },
    {
      title: 'Automatic Data Capture',
      description: 'Our intelligent extraction tool will identify and capture essential details like dates, amounts, and vendor information in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Review & Export',
      description: 'Instantly review the extracted data and export it to your preferred format, streamlining your workflow.',
      icon: step_icon_3,
    },
  ];

  export const testimonialsData = [
    {
        image: profile_img_1,
        name: 'Alice Johnson',
        role: 'Finance Manager',
        stars: 5,
        text: `Using this tool has transformed our workflow. It's fast, accurate, and has saved us countless hours of manual data entry.`
    },
    {
        image: profile_img_2,
        name: 'Michael Smith',
        role: 'Small Business Owner',
        stars: 5,
        text: `This tool makes managing invoices a breeze! I can quickly extract all the necessary details, allowing me to focus on growing my business.`
    },
    {
        image: profile_img_1,
        name: 'Sarah Lee',
        role: 'Accountant',
        stars: 5,
        text: `I love how easy it is to upload invoices and get instant results. It's become an essential part of my daily work routine!`
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
    },
  ]