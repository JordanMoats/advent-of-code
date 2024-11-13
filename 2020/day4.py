with open('2020/input/4.txt') as file:
    content = file.read()

def get_dict(passport):
    dict = {}
    lines = passport.split('\n')
    for line in lines:
        pieces = line.split(' ')
        for piece in pieces:
            key_value = piece.split(':')
            dict[key_value[0]] = key_value[1]
    return dict

def a():

    def check_valid(dict):
        required_keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
        for key in required_keys:
            if key not in dict:
                return False
        return True

    passports = content.split('\n\n')[:-1]

    dicts = [get_dict(x) for x in passports]

    valid_count = 0
    for dict in dicts:
        if check_valid(dict):
            valid_count += 1

    print(f'valid: {valid_count}')

def b():
    def check_valid2(d):
        if not all(key in d for key in ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']):
            return False
            
        try:
            if not (1920 <= int(d['byr']) <= 2002): return False
            if not (2010 <= int(d['iyr']) <= 2020): return False  
            if not (2020 <= int(d['eyr']) <= 2030): return False

            height = d['hgt']
            if height.endswith('cm'):
                if not (150 <= int(height[:-2]) <= 193): return False
            elif height.endswith('in'):
                if not (59 <= int(height[:-2]) <= 76): return False
            else:
                return False

            # Hair color
            if not (d['hcl'].startswith('#') and len(d['hcl']) == 7 and 
                    all(c in '0123456789abcdef' for c in d['hcl'][1:].lower())):
                return False

            # Eye color
            if d['ecl'] not in {'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'}:
                return False

            # Passport ID
            if not (len(d['pid']) == 9 and d['pid'].isdigit()):
                return False

            return True
            
        except:
            return False    
    passports = content.split('\n\n')[:-1]

    dicts = [get_dict(x) for x in passports]

    valid_count = 0
    for dict in dicts:
        if check_valid2(dict):
            valid_count += 1
    
    print(f'b: {valid_count} ')
a()
b()
