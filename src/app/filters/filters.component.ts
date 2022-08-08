import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filtersForm: FormGroup;
  diets = ['pescatarian', 'lacto vegetarian', 'ovo vegetarian', 'vegetarian', 'vegan'];
  courses = ['main course', 'side dish', 'dessert', 'salad', 'bread', 'appetizer', 'breakfast', 'soup', 'beverage', 'sauce', 'drink'];
  intolerances = ['dairy', 'egg','gluten','peanut','sesame','seafood','shellfish','soy','sulfite','tree nut', 'wheat'];
  cuisine = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british',
    'irish', 'french','italian', 'mexican', 'spanish', 'middle eastern,', 'jewish', 'american', 'cajun', 'southern', 'greek',
    'german', 'nordic', 'eastern european','caribbean', 'latin american'];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.filtersForm = new FormGroup({
      includeIngredient: new FormControl(''),
      excludeIngredients: new FormControl(''),
      diet: new FormControl(''),
      course: new FormControl(''),
      intoleranceArray: new FormArray([]),
      cuisineArray: new FormArray([])
    });

  }

  onSubmit(){
    //this.recipeService.getFilterValues(this.filtersForm)
    this.recipeService.onAddedFilters.emit(this.filtersForm.value);
  }

  onCheckboxChange(e, array: any) {
    const formArray: FormArray = this.filtersForm.get(array) as FormArray;

    if (e.target.checked) {
      formArray.push(new FormControl(e.target.value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === e.target.value);
      formArray.removeAt(index);
    }
  }

}
