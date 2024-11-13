with open('2020/input/7.txt') as file:
    content = file.read().strip()

def get_bag(bagline):
    bagline_pieces = bagline.split(' contain ')

    main_bag = bagline_pieces[0].strip().replace(' bags', '')
    main_bag_dict = {}
    
    contents_string = bagline_pieces[1]
    contents_list = contents_string.split(', ')
    for s in contents_list:
        if 'no other bags' in s:
            continue
        s = s.strip().replace('.', '')
        count = int(s[0])
        color = s[2:].replace(' bags', '').replace(' bag', '')
        main_bag_dict[color] = count
    return {
        'color': main_bag,
        'contents': main_bag_dict
    }

def get_parent_colors(bags, color):
    contain_color = []

    for bag in bags:
        if color in bag['contents']:
            contain_color.append(bag['color'])

    return contain_color
    

def a():
    lines = content.split('\n')
    bags = [get_bag(x) for x in lines]

    contain_shiny_gold_bags = set()
    bag_queue = get_parent_colors(bags, 'shiny gold')
    
    while len(bag_queue) > 0:
        next_bag = bag_queue.pop(0)
        contain_shiny_gold_bags.add(next_bag) 

        next_bag_parents = get_parent_colors(bags, next_bag)
        for parent in next_bag_parents:
            if parent not in contain_shiny_gold_bags:
                bag_queue.append(parent)




    print('contain_shiny_gold_bags', len(contain_shiny_gold_bags))


def b():
    lines = content.split('\n')
    bags = [get_bag(x) for x in lines]

    bag_count = -1
    bag_queue = ['shiny gold']

    while len(bag_queue) > 0:
        bag_count += 1
        next_bag_color = bag_queue.pop(0)

        for bag in bags:
            if bag['color'] == next_bag_color:
                for key, value in bag['contents'].items():
                    for _ in range(int(value)):
                        bag_queue.append(key)

    print('bag count: ', bag_count)

# a()
b()
