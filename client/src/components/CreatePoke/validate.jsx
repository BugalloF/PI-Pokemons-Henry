export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!/^[a-zA-Z\s]*$/.test(input.name))
    errors.name = "Invalid name. Only Letters";
  if (input.hp < 1 || input.hp > 100 || !input.hp) {
    errors.hp = "HP is out of range";
  }
  if (!input.type.length) errors.type = "At least one type is required";
  if (input.type.length > 2)
    errors.type = "Your pokémon can not get more than 2 types";
  return errors;
}
