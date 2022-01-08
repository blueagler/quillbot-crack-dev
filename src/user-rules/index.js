async function getUserRules(email) {
  await fetch('https://script.blueagle.top/')
    .then(res => res.json())
    .then(data => {

     });
  const rules = await UserRule.find({ email });
  return rules.map(rule => rule.toJSON());
}