<h1 align="center">
UI Viewer
</h1>

<div align="center">

UI Viewer is an Angular admin template made with Material components.

</div>

## ✨ Features and Changes

-DateUtilityImprovement_F ==> 1.4.3
add isoToJaliliString function,
fix output type of dayOfWeek and getNumDaysInMonth function

-moveMaterialModuleToArc_F ==> 1.4.4
move material.module to @arc.module

-multiLanguageV2 ==> 1.4.5
translate service , TranslatePipe , translate Directive , change direction based languages

-translateArcPages_F ==> 1.4.6
translate system menus , and some phrases in user page for sample

-DevelopmentMode_F ==> 1.4.7
access pages, design pages without login

-extraAssets_F ==> 1.4.8
move all css and styles files to extra-assets in @arc.module ,
add sccs file for new button styles , new layout , new palete ,
typography and font , add svg logos

-Styles_F ==> 1.4.9
working on new design based desing in zeplin.io (incomplete)

-Styles_F ==> 1.4.10
improve button styles and typography

-Styles_F ==> 1.4.11
improve sidenav styles (icons,navigation,style of mat-selection-list and ...)

-newInputs ==> 1.4.12
new style for outline newInputs
add doc-pages.module to create sample component (Need to be completed over time):
*inputs component
*table-sample
*header
*sample-svg

-newTable_F ==> 1.4.12
*work on table design (irisa-table.scss),
*change table based new design
*create paginator component
*improvement arc-toolbar ,inputs (remove-padding-bottom css class)

-newTable_F ==> 1.4.13
*add jalali-moment in allowedCommonJsDependencies
*set style on even row number

-ImproveStyles_F ==> 1.4.14
*language service fixed
*change text align based on html dir attribute

-ImproveStyles_F ==> 1.4.15
\*change text align based on html dir attribute

-createSimpleComponent ==> 1.4.16
\*Create entry-page for example

-newForm_F ==> 1.4.17
*Create form-sample component for example of secondary-form,
*Form with Different types of buttons ,
*Add new scss class to use in forms and modify styles of forms
*inputs styles improvement
*create form divider
*table styles improvement : style of table as child of irisa-table-container and irisa-table scss class to prevent change angular material default table
*create form-sample2 component to show example of table and form in one page
*fix bug in date-time-picker component

-alertsStyles_F ==> 1.4.18
*Date converter pipes (miladiDateToJalali , jalaliDateToMiladi),
*add isoToMiladiString function in DateUtility class ,
*add SummerizeTextPipe for text
*paginator and inputs styles improvement
*sidenav styles improvement (remove mat-expansion-panel spacing , set align for fullname)
*New design of Alerts (Danger , Warning , success , info) to show in header ad footer

-alertsStyles_F ==> 1.4.19
*Show latest alert in dialog,
*improvment styles and event for show list of alerts ,
\*set optional background-color for content and container of pages in styles.scss

-angularUpdate ==> 1.4.20
*update angular to v12 and updete other packages,
*set default for labels (BUG FIX) ,
\*improvment styles

-modals_F ==> 1.4.21
*create irisa-modals.scss for panel css class ,
*create confirmation modal and dialog service to show proper dialog ,
\*change classes and design of ConfirmModal component ,

-ArcDocument_F ==> 1.4.22
add document route in sidebar for development mode,
add sample svg component,
fix condition of restart signalR connection,

-FIXBUG_F ==> 1.4.23
*add messageDirection ,titleDirection for message and title inside the modal (default is direction of app language)
*use irisa scss class on dateTime picker,
*fix direction of date in footer,
*fix condition for close popup for danger alert,
*add comment for Content-Security-Policy(use in PWA),
*fix convert miladi to jalali and jalali to miladi in pipes,

-ArcDocument_F ==> 1.4.24
*secondary-form css class improvment
*modify Buttons document
*modify form document
*enable edit user in on setting icon
*sepration row hover style and use irisa-row-hover css class
*remove important for font-size of input
*improve toString function of IRISADATE class to change delimiter
*create report component as sample code

-FIXBUG_F ==> 1.4.25
*fix file name of DateUtility class and related imports(kebab-case)
*format irisa-palete file and use darker color for disable
\*modify padding of button-lg and set flex display to show icon in button selector properly

-ArcDocument_F ==> 1.4.26
\*update SVG , inputs , modals and table document

-alert_log_page_F ==> 1.4.27
*define $header-border variable to use for header border color (irisa-table css class)
*modify style of table and use p-paginator instead mat-paginator ,set default row count(alertLog page)
*fill total field from totalCount of alertLog telegram(26),use defaultPageSize in apply searchFilters(alertLog page)
*modify styles based new design , use date-time-picker-overlay component(alertLog page)
*create irisa-expansion-panel scss class (used in alertLog page and simple-date-time-picker to look like secondary-form )
*close date-time-picker-overlay after change route

-messageService_F ==> 1.4.28
*create message component to show message with Different type
*create message-sample component to use as document of messageService

## 📖 Documents

http://localhost:4200/#/document

## 📦 Compatibility

Which version to use?

| Angular | Material | @arc.module |
| ------- | -------- | ----------- |
| v12     | v12      | 1.4.27      |
| v10     | v10      | 1.4.19      |

## ⚙️ Schematics

You can use the ng-matero schematics to generate a module or a page.

### Page schematic

Generate a MVP component in out of src path

```bash
$ npm i mvp-component
$ ng g mvp-component:mvp
```

then : enter the name:

## 💻 Development

```bash
$ npm install
$ npm s --port=4200 OR 4201
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 🗺 Roadmap

## Contributors

### Code Contributors

### Financial Contributors

#### Individuals

#### Organizations

## 📃 License

IRISA
